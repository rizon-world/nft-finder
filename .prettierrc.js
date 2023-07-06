module.exports = {
  svelteSortOrder: 'options-styles-scripts-markup',
  svelteStrictMode: true,
  svelteBracketNewLine: false,
  svelteAllowShorthand: false,
  svelteIndentScriptAndStyle: false,
  plugins: [
    'prettier-plugin-svelte',
    'prettier-plugin-tailwindcss', // MUST come last
  ],
  pluginSearchDirs: false,
  trailingComma: 'all',
  tabWidth: 2,
  singleQuote: true,
};
