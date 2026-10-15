"""Check that UI layout changes do not drop the site's existing content data.

This checks the website content dataset, not completeness of unpublished Word
requirements (internal notes, image briefs and unavailable company data).
"""
import json
import re
import unicodedata
from html.parser import HTMLParser
from pathlib import Path

class MainText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.inside = False
        self.skip = 0
        self.text = []
    def handle_starttag(self, tag, attrs):
        if tag == 'main': self.inside = True
        if self.inside and tag in ('script', 'style'): self.skip += 1
    def handle_endtag(self, tag):
        if tag == 'main': self.inside = False
        if self.inside and tag in ('script', 'style'): self.skip -= 1
    def handle_data(self, data):
        if self.inside and not self.skip: self.text.append(data)

def normalize(value):
    return re.sub(r'\s+', '', unicodedata.normalize('NFC', value))

pages = json.loads(Path('src/lib/website-content.json').read_text(encoding='utf-8'))
missing = []
checked = 0
for page in pages:
    parser = MainText()
    parser.feed(Path('.next/server/app', (page['slug'] or 'index')+'.html').read_text(encoding='utf-8'))
    rendered = normalize(''.join(parser.text))
    for block in page['blocks']:
        for node in block['nodes']:
            values = ([node['text']] if node.get('text') else [])
            values += [cell for row in node.get('rows', []) for cell in row]
            for value in values:
                checked += 1
                if normalize(value) not in rendered:
                    missing.append({'page':page['slug'],'block':block['id'],'text':value})

report = {'pages':len(pages),'text_items_checked':checked,'missing':missing}
Path('docs/verification-2026-10-13/content-retention.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
if missing:
    for item in missing: print(item['page'],item['block'],ascii(item['text']))
    raise SystemExit(f'FAIL: {len(missing)} content items not found in rendered main content.')
print(f'PASS: {checked} text items across {len(pages)} pages remain rendered.')

