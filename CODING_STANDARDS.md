# Coding Standards for Mandays Calculator

This document outlines the coding conventions, style guidelines, and best practices for the Mandays Calculator project.

## Table of Contents

- [General Guidelines](#general-guidelines)
- [JavaScript & TypeScript](#javascript--typescript)
- [React Components](#react-components)
- [Commit Messages](#commit-messages)
- [Code Reviews](#code-reviews)

## General Guidelines

- **Consistency**: Stick to the conventions laid out in this document.
- **Readability**: Write code as if the next person to maintain it is a violent psychopath who knows where you live. It should be easily understandable.
- **Comments**: Comment your code where necessary but avoid obvious comments.
- **Variable Naming**: Use camel case for variable naming while upper case for constants
- **Import Sequence**: Follow eMPF import guidelines

## JavaScript & TypeScript

- Use `const` and `let` over `var`.
- Always use semicolons at the end of a statement.
- Prefer arrow functions unless you have a specific reason to use the `function` keyword.
- Use TypeScript types and interfaces to define prop shapes, state, and other predictable data structures.

## React Components

- Use functional components with hooks unless you have a strong reason to use class components.
- Prop validation should be done using TypeScript instead of PropTypes.
- Avoid using `any` as a type. Be as specific as possible.
- Components should be small and single-purposed.
- Create a jest test case for every component and pages you will create.

### Styling a custom component

- For text elements, set the font size using `rem`.
- Utilize the theme spacing convention for margins and padding with the pattern: `${({ theme }) => theme.spacing(2.6, 3)};`.
- Prioritize the Material-UI theme for design attributes like colors, backgrounds, and spacing. For instance, to set a background color, use: background: `${({ theme }) => theme.palette.primary.light};`

## Commit Messages

- Write clear and descriptive commit messages describing the changes.
- Use this as a guide for creating a [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Code Reviews

- Ensure that all tests pass before merging.
- No piece of code gets merged without a review. No exceptions.
- Look for clear code structure, performance implications, and potential bugs.

---

Refer back to the main [README.md](./README.md) for more project details.
