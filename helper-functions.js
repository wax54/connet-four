
/**
 * repeats a function itertations times. Each time the function is run, it is passed the iteration it is on,
 *    and all the other params passed in to the repeat function
 *
 * @param {number} iterations how many times do you want the selected function repeated
 * @param { function } func the function to repeat
 * @param  {...any} rest other paramaters you want passed into the repeated function
 */

function repeat(iterations, func, ...rest) {
    for (let i = 0; i < iterations; i++) func(i, ...rest);
}
