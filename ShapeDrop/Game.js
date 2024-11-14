import React, { useEffect } from "react";
import './Game.css';

export default function Game() {
    useEffect(() => {
        const shapes = document.querySelectorAll('.shape');
        const zones = document.querySelectorAll('.drop-zone');

        shapes.forEach(shape => {
            shape.addEventListener('dragstart', e => {
                e.dataTransfer.setData('color', shape.id);
            });
        });

        zones.forEach(zone => {
            zone.addEventListener('dragover', e => {
                e.preventDefault();
            });

            zone.addEventListener('drop', e => {
                e.preventDefault();
                const color = e.dataTransfer.getData('color');
                
                // Corrected conditional statements for multiple colors
                if (
                    (color === 'red-shape' && zone.id === 'red-zone') ||
                    (color === 'blue-shape' && zone.id === 'blue-zone') ||
                    (color === 'yellow-shape' && zone.id === 'yellow-zone') ||
                    (color === 'purple-shape' && zone.id === 'purple-zone')
                ) {
                    zone.appendChild(document.getElementById(color));
                    alert('Good Job!');
                } else {
                    alert('Try again!');
                }
            });
        });

        return () => {
            shapes.forEach(shape => shape.removeEventListener('dragstart', () => {}));
            zones.forEach(zone => {
                zone.removeEventListener('dragover', () => {});
                zone.removeEventListener('drop', () => {});
            });
        };
    }, []);

    // Reset button handler
    const handleReset = () => {
        const redShape = document.getElementById('red-shape');
        const blueShape = document.getElementById('blue-shape');
        const yellowShape = document.getElementById('yellow-shape');
        const purpleShape = document.getElementById('purple-shape');
        const gameBoard = document.querySelector('.game-board');

        // Append shapes back to the game board to reset positions
        gameBoard.appendChild(redShape);
        gameBoard.appendChild(blueShape);
        gameBoard.appendChild(yellowShape);
        gameBoard.appendChild(purpleShape);
    };

    return (
        <div className="game-container">
            <div className="game-board">
                <div className="drop-zone" id="red-zone"></div>
                <div className="drop-zone" id="blue-zone"></div>
                <div className="drop-zone" id="yellow-zone"></div>
                <div className="drop-zone" id="purple-zone"></div>
                <div className="shape" id="red-shape" draggable="true"></div>
                <div className="shape" id="blue-shape" draggable="true"></div>
                <div className="shape" id="yellow-shape" draggable="true"></div>
                <div className="shape" id="purple-shape" draggable="true"></div>
            </div>
            <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
    );
}
