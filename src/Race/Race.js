import { useState } from 'react';
import './Race.css';

function Race() {

    const currentPlayerId = '1';
    const delta = 90;

    const [players, setPlayers] = useState([
        { id: '1', name: 'Peter', delta: 0 },
        { id: '2', name: 'Foo', delta: -delta },
        { id: '3', name: 'Bla', delta: -2 * delta }
    ]);
    const [isFinished, setIsFinished] = useState(false);

    const playerSolved = playerId => {
        addPlayerChangeAnimation(playerId, 'solved');
        if (playerId === currentPlayerId) {
            updateOthers(-delta);
        } else {
            updateOther(delta, playerId);
        }
    };

    const playerFailed = playerId => {
        addPlayerChangeAnimation(playerId, 'failed');
        if (playerId === currentPlayerId) {
            updateOthers(+delta);
        } else {
            updateOther(-delta, playerId);
        }
    };

    const addPlayerChangeAnimation = (playerId, prop) => {
        const newPlayers = [...players];
        const index = newPlayers.findIndex(player => player.id === playerId);
        doAddPlayerChangeAnimation(players, index, prop, true);
        setTimeout(() => doAddPlayerChangeAnimation(players, index, prop, false), 1000);
    };

    const doAddPlayerChangeAnimation = (players, index, prop, changeDirection) => {
        players[index][prop] = changeDirection;
        setPlayers(players);
    };

    const updateOthers = (delta) => {
        const newPlayers = [...players];
        newPlayers.forEach(player => {
            if (player.id !== currentPlayerId) {
                player.delta += delta;
            }
        })
        setPlayers(newPlayers);
    };

    const updateOther = (delta, playerId) => {
        const newPlayers = [...players];
        const player = newPlayers.find(player => player.id === playerId);
        player.delta += delta;
        setPlayers(newPlayers);
    };

    const finish = () => {
        setIsFinished(true);
    };

    return (
        <>
            <div className={`Race ${isFinished ? 'is-finished' : ''}`}>
                <div className="Race-image" />
                {
                    players.map((player, index) => (
                        <Kart key={index} player={player} index={index} />
                    ))
                }
            </div>
            <div>
                {
                    players.map(player => (
                        <div key={player.id}>
                            <button onClick={() => playerSolved(player.id)}>
                                Player {player.id}: Solved
                            </button>
                            <button onClick={() => playerFailed(player.id)}>
                                Player {player.id}: Failed
                            </button>
                        </div>
                    ))
                }
                <button onClick={finish}>Finish</button>
            </div>
        </>
    );
}

const Kart = ({ player }) => (
    <div
        className={[
            'Kart',
            player.solved ? 'is-solved' : player.failed ? 'is-failed' : ''
        ].join(' ')}
        style={{ marginLeft: `${player.delta}px` }}
    >
        <div className="Kart-image" />
        <label className="name">{player.name}</label>
    </div>
)

export default Race;
