export default function getLastTenMovements(timeline) {
    let results = '';
    for (let i = 0; i < 10; i++) {
        if (timeline[i]) {
            results += timeline[i].user[0].toUpperCase();
        }
    };
    return results;
}