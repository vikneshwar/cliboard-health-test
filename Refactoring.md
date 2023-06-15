# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
The updated code is a significant improvement as it is now clearer and more efficient. The previous code had multiple redundant conditions for setting the default value in the absence of the `event`. The new code rectifies this issue by setting the default value at the beginning of the function and exiting early. Furthermore, the previous code lacked modularity and customizability in the hash value calculation logic, which was also called multiple times. The new code addresses this issue by moving the hash logic into a separate function. This new function is now more efficient and can be reused in other parts of the project where different crypto algorithms or digests are required.