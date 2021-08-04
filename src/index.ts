import { config } from "dotenv";
import server from './server';
import DB from './core/database';

config();

const PORT = process.env.PORT || 3000;

(async function () {
    try {
        const db = new DB;
        db.connect();
        server.listen(PORT, () => console.log(`Application run on the ${PORT}-port`));
    } catch (err) {
        throw new Error(err)
    }
})();