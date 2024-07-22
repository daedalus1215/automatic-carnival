import { config as loadEnv } from 'dotenv'

export const newRelicConfig = async () => {
    loadEnv();
    if (process.env.NEW_RELIC_APP_NAME) {
        return import('newrelic');
    }
};