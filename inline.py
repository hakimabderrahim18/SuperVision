import os
import re

def inline_assets():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dist_dir = os.path.join(base_dir, 'dashboard', 'dist')
    assets_dir = os.path.join(dist_dir, 'assets')
    output_html_path = os.path.join(base_dir, 'dashboard.html')
    index_html_path = os.path.join(dist_dir, 'index.html')

    print(f"Reading built files from: {dist_dir}")
    
    if not os.path.exists(index_html_path):
        print(f"Error: {index_html_path} does not exist. Run 'npm run build' inside the 'dashboard' folder first.")
        return

    # Find the CSS and JS files in the assets folder
    css_file = None
    js_file = None
    
    for f in os.listdir(assets_dir):
        if f.endswith('.css'):
            css_file = f
        elif f.endswith('.js'):
            js_file = f

    if not css_file or not js_file:
        print(f"Error: Could not find CSS or JS bundles in {assets_dir}")
        return

    print(f"Found CSS bundle: {css_file}")
    print(f"Found JS bundle: {js_file}")

    # Read the file contents
    with open(os.path.join(assets_dir, css_file), 'r', encoding='utf-8') as f:
        css_content = f.read()

    with open(os.path.join(assets_dir, js_file), 'r', encoding='utf-8') as f:
        js_content = f.read()

    with open(index_html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Match: <script type="module" crossorigin src="/assets/index-CNxUiQRH.js"></script>
    # Match: <link rel="stylesheet" crossorigin href="/assets/index-BrtsaV5M.css">
    
    js_pattern = r'<script type="module" crossorigin src="[^"]+"></script>'
    css_pattern = r'<link rel="stylesheet" crossorigin href="[^"]+">'

    # Find matched tags
    js_match = re.search(js_pattern, html_content)
    css_match = re.search(css_pattern, html_content)

    if not js_match or not css_match:
        print("Error: Could not match script or style tags in index.html")
        return

    style_tag = f"<style>\n{css_content}\n</style>"
    script_tag = f"<script type=\"module\">\n{js_content}\n</script>"

    # Use simple string replace to prevent regex parsing errors from minified JS backslashes
    new_html = html_content.replace(css_match.group(0), style_tag)
    new_html = new_html.replace(js_match.group(0), script_tag)

    # Write the output inlined HTML
    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)

    print(f"Successfully generated single-file dashboard: {output_html_path}")
    print(f"File size: {os.path.getsize(output_html_path) / 1024:.2f} KB")

if __name__ == '__main__':
    inline_assets()
