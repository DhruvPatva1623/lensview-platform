const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');
const publicDir = path.join(__dirname, 'public');

// Initialize public directory
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.html'));

const pages = [];

// 1. Rename files, copy to public
files.forEach(file => {
    const htmlContent = fs.readFileSync(path.join(screensDir, file), 'utf-8');
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
    let title = titleMatch ? titleMatch[1].replace(' | LensView', '').replace('&amp;', '&') : 'Untitled';

    // Generate slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Check duplicates
    if (pages.find(p => p.slug === slug)) {
        slug += '-' + Math.floor(Math.random() * 100);
    }

    const newHtmlName = `${slug}.html`;
    const oldPngName = file.replace('.html', '.png');
    const newPngName = `${slug}.png`;

    // Add simple navigation back to home in the UI if possible
    let finalHtml = htmlContent.replace('</body>', `
      <div class="fixed bottom-6 right-6 z-[9999]">
          <a href="index.html" class="flex items-center gap-2 bg-[#13a4ec] text-white px-5 py-3 rounded-full shadow-2xl hover:bg-[#108ece] transition-all font-bold group" style="text-decoration: none;">
              <span class="material-symbols-outlined text-sm">home</span>
              Return to Hub
          </a>
      </div>
    </body>`);

    // Fix CSS imports if missing material-symbols
    if (!finalHtml.includes('Material+Symbols+Outlined')) {
        finalHtml = finalHtml.replace('</head>', '<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/></head>');
    }

    // Write HTML
    fs.writeFileSync(path.join(publicDir, newHtmlName), finalHtml);

    // Copy image
    if (fs.existsSync(path.join(screensDir, oldPngName))) {
        fs.copyFileSync(path.join(screensDir, oldPngName), path.join(publicDir, newPngName));
    }

    pages.push({ title, slug, html: newHtmlName, img: newPngName });
});

// Create HTML mapping rows
const rows = pages.map((p, i) => {
    return `
        <a href="${p.html}" class="group relative flex flex-col rounded-3xl overflow-hidden glass-card hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(19,164,236,0.3)]">
            <div class="aspect-[4/3] w-full overflow-hidden relative">
                <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-center items-center text-white backdrop-blur-sm">
                    <span class="material-symbols-outlined text-5xl mb-2 drop-shadow-lg">open_in_new</span>
                    <span class="font-bold text-lg drop-shadow-lg">Launch Module</span>
                </div>
                <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover object-top border-b border-white/10 group-hover:scale-105 transition-transform duration-700"/>
                <div class="absolute top-4 left-4 z-20">
                   <span class="px-3 py-1 rounded-full bg-black/60 backdrop-blur text-xs font-bold border border-white/10 shadow-lg text-white">Module ${(i + 1).toString().padStart(2, '0')}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold group-hover:text-primary transition-colors mb-2">${p.title}</h3>
                <div class="flex justify-between items-center text-slate-400 mt-4">
                    <span class="text-sm font-medium flex items-center gap-1"><span class="material-symbols-outlined text-sm">visibility</span> Preview</span>
                    <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
            </div>
        </a>
    `;
}).join('');

// 2. Generate Beautiful Index.html
const indexHtml = `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LensView Hub - Photography Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .glass-card { background: rgba(16, 28, 34, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
    </style>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: { primary: "#13a4ec", background: "#0a111a" }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-slate-100 min-h-screen">
    
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 w-full border-b border-white/10 glass-card px-6 lg:px-20 py-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-2 text-primary">
                <span class="material-symbols-outlined text-3xl">filter_tilt_shift</span>
                <h1 class="text-2xl font-extrabold tracking-tight">LensView OS</h1>
            </div>
            <div class="hidden md:flex gap-6 text-sm font-semibold text-slate-400">
                <a href="#" class="hover:text-white transition">Platform</a>
                <a href="#" class="hover:text-white transition">Features</a>
                <a href="#" class="hover:text-white transition">Community</a>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <main class="max-w-7xl mx-auto px-6 lg:px-20 py-20">
        <div class="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold mb-6">
                <span class="size-2 rounded-full bg-primary animate-pulse"></span>
                v1.0 is live
            </div>
            <h2 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">Your complete <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">photography ecosystem</span></h2>
            <p class="text-xl text-slate-400">All the tools, pages, and dashboards you need to run an elite photography business. Choose a module below to start.</p>
        </div>

        <!-- Directory Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            ${rows}
        </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/10 mt-20 py-12 px-6 lg:px-20 text-center text-slate-500 text-sm">
        <p>&copy; 2026 LensView OS. All modules dynamically linked for seamless experience.</p>
    </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);
console.log('Website built successfully in /public directory!');
