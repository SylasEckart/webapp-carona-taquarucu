
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import validateJsxNesting  from 'eslint-plugin-validate-jsx-nesting';
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");


export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
        "validate-jsx-nesting": validateJsxNesting
    },
    rules: {
        "validate-jsx-nesting/no-invalid-jsx-nesting": "error"
    }
  }
);