import getLastTenMovements from '../helper_functions/getLastTenMovements.js';

export default function getCPUMove(timeline) {
    return new Promise((resolve, reject) => {
        const options_by_first_letter = {
            R: 'rock',
            P: 'paper',
            S: 'scissors',
        };
        fetch('https://smartplay.afiniti.com/v1/play/' + getLastTenMovements(timeline)).then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            resolve({
                move: options_by_first_letter[myJson.nextBestMove],
                message: myJson.reason
            });
        });
    });
}