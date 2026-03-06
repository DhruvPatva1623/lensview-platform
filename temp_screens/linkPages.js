const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
    console.error("Public directory not found.");
    process.exit(1);
}

const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(publicDir, file), 'utf-8');

    // Link top navigation items based on their text content
    content = content.replace(/href="#"([^>]*>.*?<\/a>)/gs, (match, rest) => {
        let link = "#";
        const text = rest.toLowerCase();

        if (text.includes('explore')) link = 'explore-discover.html';
        else if (text.includes('community')) link = 'community-social-feed.html';
        else if (text.includes('analytics')) link = 'photographer-analytics-dashboard.html';
        else if (text.includes('boards') || text.includes('inspiration')) link = 'inspiration-mood-boards.html';
        else if (text.includes('dashboard')) link = 'photographer-analytics-dashboard.html';
        else if (text.includes('upload') || text.includes('publish')) link = 'studio-upload-and-publish.html';
        else if (text.includes('library') || text.includes('projects')) link = 'media-library-manager.html';
        else if (text.includes('profile')) link = 'photographer-public-profile.html';
        else if (text.includes('feed')) link = 'lensview-discovery-feed.html';

        return `href="${link}"${rest}`;
    });

    // Link the LensView logo back to the home hub page
    content = content.replace(/<div class="flex items-center gap-2 text-primary[^>]*>\s*<span class="material-symbols-outlined[^>]*>filter_tilt_shift<\/span>\s*<h2[^>]*>LensView<\/h2>\s*<\/div>/gi,
        `<a href="index.html" class="flex items-center gap-2 text-primary hover:opacity-80 transition-all cursor-pointer" style="text-decoration:none;">
            <span class="material-symbols-outlined text-3xl">filter_tilt_shift</span>
            <h2 class="text-xl font-extrabold tracking-tight">LensView</h2>
        </a>`
    );

    // Save the file
    fs.writeFileSync(path.join(publicDir, file), content);
});

console.log("Successfully linked all pages together!");
