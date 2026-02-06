// link to earth texture maps in publc/textures folder
export const EARTH_TEXTURE_MAPS = {
    dayMap: '/textures/earth-daymap.jpg',
    nightMap: '/textures/earth-nightmap.jpg',
    bumpMap: '/textures/earth-bump.jpg',
    clouds: '/textures/earth-cloud.jpg',
    cloudTransparency: '/textures/earthcloudmaptrans.jpg',
    specs: '/textures/earthspecs.jpg'
};


export const PLANETS_TEXTURE_MAPS = [
    {
        name: 'Mercury',
        size: 0.38,
        orbitRadius: 5.8,
        duration: 88,
        color: '#b1b1b1',
        texturePath: '/textures/solarSystem/2k_mercury.jpg'
    },
    {
        name: 'Venus',
        size: 0.95,
        orbitRadius: 10.8,
        duration: 225,
        color: '#e6c2a1',
        texturePath: '/textures/solarSystem/2k_venus_surface.jpg'
    },
    {
        name: 'Earth',
        size: 1,
        orbitRadius: 15,
        duration: 365,
        color: '#2a5cff',
        texturePath: '/textures/earth-daymap.jpg'
    },
    {
        name: 'Mars',
        size: 0.53,
        orbitRadius: 22.8,
        duration: 687,
        color: '#ff6f40',
        texturePath: '/textures/solarSystem/2k_mars.jpg'
    },
    {
        name: 'Jupiter',    
        size: 11.2,
        orbitRadius: 77.8,
        duration: 4333,
        color: '#d8ca9d',
        texturePath: '/textures/solarSystem/2k_jupiter.jpg'
    },
    {
        name: 'Saturn',
        size: 9.45,
        orbitRadius: 143.4,
        duration: 10759,
        color: '#f5deb3',
        texturePath: '/textures/solarSystem/2k_saturn.jpg',
        ringsTexturePath: '/textures/solarSystem/2k_saturn_ring_alpha.png'
    },
    {
        name: 'Uranus',
        size: 4.0,
        orbitRadius: 287.1,
        duration: 30687,
        color: '#7fffd4',
        texturePath: '/textures/solarSystem/2k_uranus.jpg'
    },
    {
        name: 'Neptune',
        size: 3.88,
        orbitRadius: 449.5,
        duration: 60190,
        color: '#4169e1',
        texturePath: '/textures/solarSystem/2k_neptune.jpg'
    }
];
