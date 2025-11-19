// Shared

export const icons  = Object.freeze({ 
    "linkedin": Object.freeze({ id: 'linkedin', src: '/img/icon/linkedin.svg' }),
    "email": Object.freeze({ id: 'email', src: '/img/icon/email.svg' }),
});

export const iconArray = Object.values(icons);

export type IconKey = keyof typeof icons;

export const videos = Object.freeze({
    "main": Object.freeze({ 
        id: 'main', 
        src: 'https://filebrowser.petrasbalsys.eu/filebrowser/api/public/dl/7rG_gqia/Easy/video/stars-4.mp4?inline=true',
        default: 'https://filebrowser.petrasbalsys.eu/filebrowser/api/public/dl/7rG_gqia/Easy/video/stars-4.mp4?inline=true',
        mobile: 'https://filebrowser.petrasbalsys.eu/filebrowser/api/public/dl/7rG_gqia/Easy/video/stars-4.mp4?inline=true',
        desktop: 'https://filebrowser.petrasbalsys.eu/filebrowser/api/public/dl/7rG_gqia/Easy/video/stars-4.mp4?inline=true',
    }),
});