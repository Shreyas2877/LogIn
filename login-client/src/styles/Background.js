// src/components/Background.js
import React from 'react';
import Particles from 'react-tsparticles';
import '../App.css'; // Import the CSS file

const Background = () => {
    return (
        <Particles
            id="tsparticles"
            options={{
                fpsLimit: 60,
                particles: {
                    color: {
                        value: "#ffffff",  // Particle color
                    },
                    links: {
                        color: "#ffffff",  // Link color
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    size: {
                        value: 3,
                        random: true,
                    },
                },
            }}
        />
    );
};

export default Background;