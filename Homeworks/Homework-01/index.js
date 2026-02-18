const section = (title, value) => {
  console.log(`\n=== ${title} ===`);
  console.log(value);
};

const base = [1, 2, 3, 4, 5];
const clone = () => [...base];

section("Array.isArray", Array.isArray(base));
section("Array.of", Array.of(7, 8, 9));
section("Array.from", Array.from("Hola"));

const pushArr = clone();
pushArr.push(6);
section("push", pushArr);

const popArr = clone();
popArr.pop();
section("pop", popArr);

const shiftArr = clone();
shiftArr.shift();
section("shift", shiftArr);

const unshiftArr = clone();
unshiftArr.unshift(0);
section("unshift", unshiftArr);

const spliceArr = clone();
spliceArr.splice(2, 1, 99);
section("splice", spliceArr);

section("slice", base.slice(1, 4));
section("concat", base.concat([6, 7]));
section("join", base.join("-"));
section("includes", base.includes(3));
section("indexOf", base.indexOf(4));
section("lastIndexOf", [1, 2, 3, 2].lastIndexOf(2));
section("at", base.at(-1));
section("toString", base.toString());
section("toLocaleString", [1, new Date("2024-01-01")].toLocaleString());

section("find", base.find((value) => value > 3));
section("findIndex", base.findIndex((value) => value > 3));

if (typeof base.findLast === "function") {
  section("findLast", base.findLast((value) => value % 2 === 0));
  section("findLastIndex", base.findLastIndex((value) => value % 2 === 0));
}

section("filter", base.filter((value) => value % 2 === 0));
section("map", base.map((value) => value * 10));
section("reduce", base.reduce((acc, value) => acc + value, 0));
section("reduceRight", base.reduceRight((acc, value) => acc - value, 0));
section("some", base.some((value) => value > 4));
section("every", base.every((value) => value > 0));

const sortArr = [3, 1, 4, 2];
sortArr.sort((a, b) => a - b);
section("sort", sortArr);

const reverseArr = clone();
reverseArr.reverse();
section("reverse", reverseArr);

const flatArr = [1, [2, 3], [4, [5]]];
section("flat", flatArr.flat(2));
section("flatMap", base.flatMap((value) => [value, value * 2]));

const fillArr = clone();
fillArr.fill(0, 1, 3);
section("fill", fillArr);

const copyWithinArr = clone();
copyWithinArr.copyWithin(0, 3, 5);
section("copyWithin", copyWithinArr);

section("forEach", (() => {
  const result = [];
  base.forEach((value) => result.push(value * 2));
  return result;
})());

section("entries", [...base.entries()]);
section("keys", [...base.keys()]);
section("values", [...base.values()]);
