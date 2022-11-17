---
title: 'Advanced type inferences and advanced types'
slug: 'blog1'
date: '17/11/2022'
---

# Advanced type inferences and advanced types

> date: 17/11/2022

TypeScript is an extension of JavaScript intended to enable easier development of large-scale JavaScript applications. While every JavaScript program is a TypeScript program, TypeScript offers a module system, classes, interfaces, and a rich gradual type system. The intention is that TypeScript provides a smooth transition for JavaScript programmers—well-established JavaScript programming idioms are supported without any major rewriting or annotations. One interesting consequence is that the TypeScript type system is not statically sound by design. The goal of this paper is to capture the essence of TypeScript by giving a precise definition of this type system on a core set of constructs of the language. Our main contribution, beyond the familiar advantages of a robust, mathematical formalization, is a refactoring into a safe inner fragment and an additional layer of unsafe rules.

![image](/blogs/blog1/ts.png)

The goal of this paper is to capture the essence of TypeScript by giving a precise definition of this type system on a core set of constructs of the language. Our main contribution, beyond the familiar advantages of a robust, mathematical formalization, is a refactoring into a safe inner fragment and an additional layer of unsafe rules. TypeScript is an extension of JavaScript intended to enable easier development of large-scale JavaScript applications. While every JavaScript program is a TypeScript program, TypeScript offers a module system, classes, interfaces, and a rich gradual type system.

```typescript
const a: number = 45

function getColorMode(): 'light' | 'dark' {
  // @ts-ignore
  return window.localStorage.getItem('theme') || 'dark'
}
```

The intention is that TypeScript provides a smooth transition for JavaScript programmers—well-established JavaScript programming idioms are supported without any major rewriting or annotations. One interesting consequence is that the TypeScript type system is not statically sound by design. The goal of this paper is to capture the essence of TypeScript by giving a precise definition of this type system on a core set of constructs of the language. Our main contribution, beyond the familiar advantages of a robust, mathematical formalization, is a refactoring into a safe inner fragment and an additional layer of unsafe rules.
