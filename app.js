'use strict';

var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

function Product(name) {
  //the product names are concanctenated with the
  this.name = name;
  this.path = 'assets/' + this.name + '.jpg';
  this.votes = 0;
  // this.timesShown = 0;
  allProducts.push(this);
}

(function() {
  for(var i in productNames) {
    new Product(productNames[i]);
  }
})();


var tracker = {
  imagesEl: document.getElementById('images'),
  resultsEl: document.getElementById('results'),
  clickCount: 0,

  imageOne: document.createElement('img'),
  imageTwo: document.createElement('img'),
  imageThree: new Image(), // Example to show that the Image constructor can be used

  //create random number
  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  generateChart: function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var options = {
    type: 'bar',
    data: {
      labels: allProducts.map(function(x) {return x.name;}),
      datasets: [{
        label: '# of Votes',
        data: allProducts.map(function(x) {return x.votes;}),
        backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
        borderWidth: 1
      },
      /*{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }*/]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    };

    var myChart = new Chart(ctx, options);
    tracker.clickCount++;
  },

  createButton: function() {
    var btn = document.createElement('button');        // Create a <button> element
    var t = document.createTextNode("Reset");       // Create a text node
    btn.appendChild(t);                                // Append the text to <button>
    document.body.appendChild(btn);
  },

  //having this gives you a constant variable to use as a random number fo each image
  displayImages: function() {
    var idOne = this.getRandomIndex();
    var idTwo = this.getRandomIndex();
    var idThree = this.getRandomIndex();

    if(idOne === idTwo || idOne === idThree || idTwo === idThree) {
      this.displayImages();
      return;
    }

    this.imageOne.src = allProducts[idOne].path;
    this.imageTwo.src = allProducts[idTwo].path;
    this.imageThree.src = allProducts[idThree].path;

    this.imageOne.id = allProducts[idOne].name;
    this.imageTwo.id = allProducts[idTwo].name;
    this.imageThree.id = allProducts[idThree].name;


    this.imagesEl.appendChild(this.imageOne);
    this.imagesEl.appendChild(this.imageTwo);
    this.imagesEl.appendChild(this.imageThree);
  },

  onClick: function(event) {
    console.log(event.target.id);

    if (tracker.clickCount < 3) {
      if(event.target.id === 'images') {
        console.log('didnt click an image');
        return;
      } else {
        tracker.clickCount++;
        console.log('click count', tracker.clickCount)
        for(var i in allProducts) {
          if(event.target.id === allProducts[i].name) {
            allProducts[i].votes++;
          }
        }

        tracker.displayImages();
      }

    } else {
      if (tracker.clickCount === 3) {
        tracker.createButton();
        tracker.generateChart();

      }



        }
  }
};

tracker.imagesEl.addEventListener('click', tracker.onClick);
tracker.displayImages();
