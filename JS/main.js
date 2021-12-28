const imageContainer = document.querySelector('.images-wrapper')
const navBar = document.querySelector('.nav-bar')
const hamburgerMenu = document.querySelector('.hamburger-menu')
const closeIcon = navBar.querySelector('.close-icon')
const next = document.querySelector('.next-wrapper')
const previous = document.querySelector('.previous-wrapper')
const addQuantity = document.querySelector('.add-icon')
const removeQuantity = document.querySelector('.remove-icon')
const quantitySpan = document.querySelector('.quantity--span')
const addToCart = document.querySelector('.add-to-cart')
const navBarBackground = document.querySelector('.navbar-background')
const imgTag = document.querySelector('.product--image')
const itemPriceSpan = document.querySelector('.discounted--price')
const cartDiv = document.querySelector('.cart-div')
const addedItems = document.querySelector('.added-items')
const showCart = document.querySelector('.basket-icon')
const cartCheckout = document.querySelector('.cart-checkout')
const cartEmpty = document.querySelector('.cart--empty')
const carouselWrapper = document.querySelector('.carousel-wrapper')
const totalItemsDiv = document.querySelector('.total-items')
const totalItemsSpan = totalItemsDiv.querySelector('span')
const lightBoxWrapper = document.querySelector('.lightbox-wrapper')
const lightBoxClose = document.querySelector('.close--lightbox')
const lightboxCarouselWrapper = document.querySelector('.lightbox-carousel-wrapper')
const lightBoxImg = document.querySelector('.lightbox--image')
const lightBoxNext = document.querySelector('.lightbox-next-wrapper')
const lightBoxPrevious = document.querySelector('.lightbox-previous-wrapper')

/**
 * Add css class to the element with added-items element
 * to show that it is empty.
 */
addedItems.classList.add('__empty')

/**
 * The following arrays store the paths to the different 
 * assets to be used in the product page.
 */
const thumbnailArray = [
    './images/image-product-1-thumbnail.jpg',
    './images/image-product-2-thumbnail.jpg',
    './images/image-product-3-thumbnail.jpg',
    './images/image-product-4-thumbnail.jpg'
]

const imageArray = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
];

/**
 * The following function creates a carousel for the main image display
 * and the light box carousel
 */
function createCarousel(arrLen, className, elementToAppend, srcChangingEl) {
    for (let i = 0; i < arrLen; i++) {
        let thumbnailImg = document.createElement('img')
        thumbnailImg.classList.add(className)
        thumbnailImg.src = thumbnailArray[i]
        thumbnailImg.addEventListener('click', () => {
            const selectedThumnails = document.querySelectorAll(`.${className}`)
            srcChangingEl.src = imageArray[i]
            for (let i = 0; i < selectedThumnails.length; i++) {
                if(selectedThumnails[i].classList.contains('active')) {
                    selectedThumnails[i].classList.remove('active')
                }  
            }
            thumbnailImg.classList.add('active')
        })
        elementToAppend.appendChild(thumbnailImg)
        const selectedThumnails = document.querySelectorAll(`.${className}`)
        selectedThumnails[0].classList.add('active');
    }
}

createCarousel(thumbnailArray.length, 'product--thumbnail', carouselWrapper, imgTag)
createCarousel(thumbnailArray.length, 'lightbox-product--thumbnail', lightboxCarouselWrapper, lightBoxImg)

/**
 * An event listener to toggle the position of the navigation
 * to appear.
 */
hamburgerMenu.addEventListener('click', () => {
    navBar.classList.toggle('open')
    navBarBackground.classList.toggle('open')
})

/**
 * An event listener to toggle the position of the navigation
 * to dissapear.
 */
closeIcon.addEventListener('click', () => {
    navBar.classList.toggle('open')
    navBarBackground.classList.toggle('open')
})
/**
 * Variables for storing various values
 */
let imageCounter = 0
let lightBoxImageCounter = 0
let quantity = 0

/**
 * An event listener for changing the source of the product image.
 */
next.addEventListener('click', () => {
    if (imageCounter >= imageArray.length - 1) {
        return
    }

    imageCounter ++

    imgTag.src = imageArray[imageCounter]
})

/**
 * An event listener for changing the source of the product image.
 */
previous.addEventListener('click', () => {
    if (imageCounter <= 0) {
        return
    }

    imageCounter --

    imgTag.src = imageArray[imageCounter]
})

/**
 * An event listener for adding or the quantity of
 * product selected.
 */
addQuantity.addEventListener('click', () => {
    quantity ++
    quantitySpan.textContent = quantity
})

/**
 * An event listener for subtracting the quantity of
 * product selected.
 */
removeQuantity.addEventListener('click', () => {
    if (quantity <= 0) {
       return 
    }

    quantity --
    quantitySpan.textContent = quantity
})

/**
 * An event listener for creating then adding cart-checkout element 
 * to the cart-div to display the quantity and price of the selected product.
 */
addToCart.addEventListener('click', () => {
    const cartCheckoutFilled = document.querySelector('.cart-checkout')

    if (quantity <= 0) {
        return
    }

    if (cartCheckoutFilled.childNodes.length > 0) {
        return
    }

    let cartItemsContainer = document.createElement('div')
    cartItemsContainer.classList.add(`${quantity}`)
    cartItemsContainer.classList.add('cart-items-container')
    let thumbnail = document.createElement('img')
    thumbnail.classList.add('item--thumbnail')
    thumbnail.src = './images/image-product-1-thumbnail.jpg'
    cartItemsContainer.appendChild(thumbnail)
    let itemDescriptionDiv = document.createElement('div')
    itemDescriptionDiv.classList.add('item-description-wrapper')
    cartItemsContainer.appendChild(itemDescriptionDiv)
    let descriptionParagraph = document.createElement('p')
    descriptionParagraph.textContent = 'Autumn Limited Edition...'
    itemDescriptionDiv.appendChild(descriptionParagraph)
    let priceSpan = document.createElement('span')
    priceSpan.classList.add('item--price')
    priceSpan.textContent = itemPriceSpan.textContent
    let quantitySpan = document.createElement('span')
    quantitySpan.classList.add('checkout--quantity')
    quantitySpan.textContent = `x${quantity}`
    let totalSpan = document.createElement('span')
    totalSpan.classList.add('checkout--total')
    totalSpan.textContent = `$${parseFloat(itemPriceSpan.textContent.slice(1)) * quantity}.00`
    let deleteIcon = document.createElement('img')
    deleteIcon.classList.add('delete--icon')
    deleteIcon.src = './images/icon-delete.svg'
    deleteIcon.addEventListener('click', () => {
        const cartCheckout = document.querySelector('.cart-checkout')
        const cartItemContainer = cartCheckout.querySelector('.cart-items-container')
        const deleteIcon = cartItemContainer.querySelector('.delete--icon')
        cartCheckout.removeChild(deleteIcon.parentNode)
        totalItemsSpan.textContent = 0

        if (cartCheckout.childNodes.length <= 0) {
            addedItems.classList.add('__empty') 
            cartEmpty.classList.remove('not__empty')
        }
    })

    totalItemsSpan.textContent = quantity
    itemDescriptionDiv.appendChild(priceSpan)
    itemDescriptionDiv.appendChild(quantitySpan)
    itemDescriptionDiv.appendChild(totalSpan)
    cartItemsContainer.appendChild(deleteIcon)
    cartCheckout.appendChild(cartItemsContainer)
    addedItems.appendChild(cartCheckout)
    addedItems.classList.remove('__empty')
    cartEmpty.classList.add('not__empty')
})

/**
 * An event listener for toggling the state of the cart-div
 */
showCart.addEventListener('click', () => {
    cartDiv.classList.toggle('open')
})

/**
 * An event listener for toggling the state of the light box
 */
imgTag.addEventListener('click', () => {
    lightBoxWrapper.classList.toggle('close')
})

/**
 * An event listener for toggling the state of the light box
 */
lightBoxClose.addEventListener('click', () => {
    lightBoxWrapper.classList.toggle('close')
})

/**
 * An event listener for changing the source of the light box image.
 */
lightBoxNext.addEventListener('click', () => {
    const selectedThumnails = lightboxCarouselWrapper.querySelectorAll('.lightbox-product--thumbnail')
    
    if (lightBoxImageCounter >= imageArray.length - 1) {
        return
    }

    lightBoxImageCounter ++
    
    lightBoxImg.src = imageArray[lightBoxImageCounter]

    for (let i = 0; i < selectedThumnails.length; i++) {
        if(selectedThumnails[i].classList.contains('active')) {
            selectedThumnails[i].classList.remove('active')
        }  
    }

    selectedThumnails[lightBoxImageCounter].classList.add('active')
})

/**
 * An event listener for changing the source of the light box image.
 */
lightBoxPrevious.addEventListener('click', () => {
    const selectedThumnails = lightboxCarouselWrapper.querySelectorAll('.lightbox-product--thumbnail')
    if (lightBoxImageCounter <= 0) {
        return
    }

    lightBoxImageCounter --
 
    lightBoxImg.src = imageArray[lightBoxImageCounter]

    for (let i = 0; i < selectedThumnails.length; i++) {
        if(selectedThumnails[i].classList.contains('active')) {
            selectedThumnails[i].classList.remove('active')
        }  
    }

    selectedThumnails[lightBoxImageCounter].classList.add('active')
})

