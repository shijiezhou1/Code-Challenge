var sum_to_n_a = function (n) {
    return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
    return n === 0 ? n : n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
    var result = 0;
    while (n >= 0) {
        result += n;
        n--;
    }
    return result;
};