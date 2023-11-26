export const config = {
    githubBaseUrl: process.env.GITHUB_BASEURL ?? 'https://api.github.com',
    debounceTime: process.env.DEBOUNCE_TIME ? parseInt(process.env.DEBOUNCE_TIME) : 300
}