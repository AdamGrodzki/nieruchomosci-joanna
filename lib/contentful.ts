import { createClient } from "contentful"
import 'dotenv/config';

export const client = createClient({
    space: String(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID),
    accessToken: String(process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY),
})