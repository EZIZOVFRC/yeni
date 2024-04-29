$(document).ready(function () {
    $(".sliders").slick({
      slidesToShow: 1,
  
      nextArrow: '<i class="fa-solid fa-right-long"></i>',
      prevArrow: '<i class="fa-solid fa-left-long"></i>',
    });
  });
  
  
  var $grid = $('.grid').isotope({
  
  })
  
  $('.filter-button-group').on('click','li',function() {
    var filterValue =$(this).attr('data-filter')
    $grid.isotope({
      filter:filterValue
    })
    
  })  




  const addCards = document.querySelectorAll('.full__card__cart');

  addCards.forEach(addCard => {
    const pr = addCard.querySelector('#pr');
    const pd = addCard.querySelector('#pd');
  
    let isPrVisible = true;
  
    addCard.addEventListener('mouseenter', function () {
      if (isPrVisible) {
        pr.style.display = 'none';
        pd.style.display = 'block';
        isPrVisible = false;
      } else {
        pd.style.display = 'none';
        pr.style.display = 'block';
        isPrVisible = true;
      }
    });
  
    addCard.addEventListener('mouseleave', function () {
      if (!isPrVisible) {
        pd.style.display = 'none';
        pr.style.display = 'block';
        isPrVisible = true;
      }
    });
  });



    let allBtns = document.querySelectorAll('#pd');
  
    for (let i = 0; i < allBtns.length; i++) {
      allBtns[i].addEventListener('click', function (e) {
        Toastify({
            text: "Product Added to Shop",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true, 
            style: {
              background: "red",
            },
          }).showToast();
        e.preventDefault();
        let Id = allBtns[i].parentElement.getAttribute('data-id');
        let Name = allBtns[i].previousElementSibling.previousElementSibling.innerText;
        let Image = allBtns[i].previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('src');
  
        let basket = JSON.parse(localStorage.getItem('basket')) || [];
  
        let exitPro = basket.find(a => a.Id === Id);
  
        if (exitPro === undefined) {
          basket.push({
            id: Id,
            name: Name,
            image: Image,
          });
        }
        localStorage.setItem('basket', JSON.stringify(basket));
      });
    }


    
    
    let table = document.querySelector(".table");
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    
    if (basket.length != 0) {
      for (const product of basket) {
        let tr = document.createElement("tr");
    
       
    
        let tdId = document.createElement("td");
        tdId.innerText = product.id;

        let tdImg = document.createElement("td");
        let img = document.createElement("img");
        img.setAttribute("src", product.image);
        img.setAttribute("width", "150px");
        tdImg.appendChild(img);

        let tdDel=document.createElement('td')
        let del=document.createElement('button')
        del.innerText='delete'
        del.classList.add('deleter')
        tdDel.appendChild(del)
    
        let tdName = document.createElement("td");
        tdName.innerText = product.name;
    
        tr.append( tdId,tdImg,tdName,tdDel);
        table.querySelector("#tab").appendChild(tr);

        del.addEventListener('click',function(id) {
          let basket = JSON.parse(localStorage.getItem("basket")) || [];
          let indexToDelete = basket.findIndex(product => product.id === id);
          if (indexToDelete !== -1) {
            basket.splice(indexToDelete, 1);
            localStorage.setItem("basket", JSON.stringify(basket));
            location.reload();
          }
        })
        del.addEventListener('click', function () {
          let productId = tr.querySelector("td:first-child").innerText;
          deleteProduct(productId);
        });
        
      }
    }
     function deleteProduct(productId) {
      let basket = JSON.parse(localStorage.getItem("basket")) || [];
      let indexToDelete = basket.findIndex(product => product.id === productId);
        basket.splice(indexToDelete, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        location.reload();

    }
       
  
    
