<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [bitburner](./bitburner.md) &gt; [NS](./bitburner.ns.md) &gt; [args](./bitburner.ns.args.md)

## NS.args property

Arguments passed into the script.

<b>Signature:</b>

```typescript
readonly args: (string | number)[];
```

## Remarks

RAM cost: 0 GB

Arguments passed into a script can be accessed using a normal array using the \[\] operator (args\[0\], args\[1\], etc…).

It is also possible to get the number of arguments that was passed into a script using: 'args.length' WARNING: Do not try to modify the args array. This will break the game.

