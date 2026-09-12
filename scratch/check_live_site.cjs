async function main() {
  const res = await fetch('https://marina-zakharova.netlify.app/');
  const html = await res.text();
  console.log('HTML Length:', html.length);
  
  const scriptRegex = /<script[^>]*src="([^"]*)"[^>]*>/g;
  let m;
  while ((m = scriptRegex.exec(html)) !== null) {
    console.log('Script:', m[1]);
  }
  
  const linkRegex = /<link[^>]*href="([^"]*)"[^>]*>/g;
  while ((m = linkRegex.exec(html)) !== null) {
    console.log('Link:', m[1]);
  }
}
main();
