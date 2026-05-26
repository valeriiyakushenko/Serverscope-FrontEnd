
import type React from 'react';
import styles from './BokehBackground.module.scss';
import { useMemo } from 'react';

interface BokehBall {
    id: number;
    size: number;
    top: string;
    left: string;
    duration: string;
    delay: string;
    blur: string;
    xMove: string;
    yMove: string;
}

const BokehBackground: React.FC = () => {

    const balls = useMemo(() => {
        const count = Math.floor(Math.random() * (20 - 15)) + 15;
        const generatedBalls: BokehBall[] = [];

        for(let i = 0; i < count; i++){
            generatedBalls.push({
                id: i,
                size: Math.floor(Math.random() * 30) + 10,
                top: `${Math.floor(Math.random() * 90) + 5}%`,
                left: `${Math.floor(Math.random() * 90) + 5}%`,
                duration: `${Math.floor(Math.random() * 10) + 10}s`,
                delay: `${Math.random() * -10}s`,
                blur: `${Math.floor(Math.random() * (10 - 1) + 1)}px`,
                xMove: `${Math.floor(Math.random() * (100 - 50) + 50)}px`,
                yMove: `${Math.floor(Math.random() * (100 - 50) + 50)}px`
            })
        }
        return generatedBalls;
    }, []);

    return (
        <div className={styles.bokehContainer}>
            {balls.map((ball) => (
                <div
                    key={ball.id}
                    className={styles.bokehBall}
                    style={{
                        '--x-move': ball.xMove,
                        '--y-move': ball.yMove,
                        width: `${ball.size}px`,
                        height: `${ball.size}px`,
                        top: ball.top,
                        left: ball.left,
                        filter: `blur(${ball.blur})`,
                        animationDuration: ball.duration,
                        animationDelay: ball.delay,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    )
}

export default BokehBackground;