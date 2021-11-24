import BubbleSort from './algorithms/BubbleSort.js';
import InsertionSort from './algorithms/InsertionSort.js';
import MergeSort from './algorithms/MergeSort.js';
import QuickSort from './algorithms/QuickSort.js';
import SelectionSort from './algorithms/SelectionSort.js';


var tr = $('tr');
var algorithms = {
    'Quadratic': [BubbleSort, InsertionSort, SelectionSort],
    'Logarithmic': [MergeSort, QuickSort]
}
var array = [];
var algorithm;
var arraySize;
var sortSpeed;

$(() => {
    for (const type in algorithms) {
        let optgroup = $('<optgroup/>', { 'label': type });
        algorithms[type].forEach(algorithm => {
            let option = $('<option/>', { 'value': algorithm.name, 'label': algorithm.name });
            optgroup.append(option);
        });
        $('select').append(optgroup);
    }

    arraySize = parseInt($('#array-size').val());
    sortSpeed = (parseInt($('#sort-speed').prop('max')) - parseInt($('#sort-speed').val())) * 10;
    algorithm = getAlgorithm($('select').val());
    shuffle();

    $(window).resize(() => {
        _generateTable();
    });


    $('select').on('change', function() {
        algorithm = getAlgorithm($(this).val());
        console.log('Selecting Algorithm:', algorithm.name, algorithm);
    });
    $('#array-size').on('input', function() {
        arraySize = parseInt($(this).val());
        console.log('setting array-size to:', arraySize, 'data-points')
        shuffle();
    });

    $('#sort-speed').on('input', function() {
        sortSpeed = (parseInt($(this).prop('max')) - parseInt($(this).val())) * 10;
        console.log('setting sort speed to:', sortSpeed + 'ms');
    });

    $('#shuffle').on('click', function() {
        console.log('shuffling array with size:', arraySize);
        shuffle();
    });

    $('#sort').on('click', async function() {
        console.log('sorting array:', array, 'with size:', arraySize, 'and sort-speed:', sortSpeed + 'ms');
        updateConsole(true);
        await new algorithm(array, sortSpeed).sort();
        updateConsole(false);
    });


});

function shuffle() {
    array = [...Array(arraySize).keys()].map(i => ++i).sort(() => Math.random() - 0.5);
    _generateTable();
}

function updateConsole(value) {
    $('#sort').prop('disabled', value);
    $('#shuffle').prop('disabled', value);
    $('#array-size').prop('disabled', value);
    $('#sort-speed').prop('disabled', value);
    $('select').prop('disabled', value);
}

function getAlgorithm(name) {
    switch (name) {
        case BubbleSort.name:
            return BubbleSort;
        case InsertionSort.name:
            return InsertionSort;
        case SelectionSort.name:
            return SelectionSort;
        case MergeSort.name:
            return MergeSort;
        case QuickSort.name:
            return QuickSort;
        default:
            throw new Error('Unknown Algorithm');
    }
}

function _generateTable() {

    tr.children().remove();
    let $td = $('<td/>');
    let $bar = $('<div/>', { "class": "bar" });

    let max = Math.max.apply(null, array);
    let maxHeight = 0.4 * window.innerHeight;

    for (var i = 0; i < array.length; i++) {
        let height = maxHeight * (array[i] / max);
        let bar = $td.clone().append(
            $bar.clone().css({
                'height': (height + 'px')
            }).attr('id', i));
        tr.append(bar);
        array[i] = height;
    }
}