import {defineConfig} from '@mikro-orm/mongodb';
import {SeedManager} from "@mikro-orm/seeder";
import {Migrator} from "@mikro-orm/migrations";
import {MongoHighlighter} from "@mikro-orm/mongo-highlighter";


export default defineConfig({
    entities: ['dist/**/**.entity.js'],
    entitiesTs: ['src/**/**.entity.ts'],
    dbName: 'tripolite',
    highlighter: new MongoHighlighter(),
    seeder: {
        path: 'dist/seeders',
        pathTs: 'src/seeders',
        defaultSeeder: 'DatabaseSeeder',
    },
    migrations: {
        tableName: 'tripolite_migrations',
        path: 'dist/migrations',
        pathTs: 'src/migrations',
    },
    extensions: [SeedManager, Migrator],
    debug: true,
});
