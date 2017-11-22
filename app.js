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

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

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

    if(event.target.id === 'images') {
      console.log('didnt click an image');
      return;
    } else {
      tracker.clickCount++;

      for(var i in allProducts) {
        if(event.target.id === allProducts[i].name) {
          allProducts[i].votes++;
        }
      }

      tracker.displayImages();
    }
  }
};

tracker.imagesEl.addEventListener('click', tracker.onClick);
tracker.displayImages();
