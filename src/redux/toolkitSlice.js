import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


export const fetchCategoriesAndCurrences = createAsyncThunk(
    'toolkit/fetchCategoriesAndCurrences',
    async function () {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `{
                        categories {
                            name
                        }
                        currencies{
                            label
                            symbol
                        }
                    }`,
            }),
        })

        const request = await response.json()
        return request
    }
)
export const fetchProductsOfCategory = createAsyncThunk(
    'toolkit/fetchProductsOfCategory',
    async function (selectedCategory) {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `{
                        category(input:{title: "${selectedCategory}"}) {
                            products{
                              brand
                            attributes {
                                id 
                                name 
                                items{
                                    value
                                    id
                                }
                            }
                                id
                                name 
                                inStock
                                gallery
                                prices {
                                    currency{
                                        label
                                        symbol
                                    }
                                    amount
                                }
                            }
                            
                        }
                       
                        
                    }`,
            }),
        })
        const request = await response.json()
        return request
    }
)
export const fetchProductsDiscriptionPage = createAsyncThunk(
    'toolkit/fetchProductsDiscriptionPage',
    async function (idOfProduct) {

        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `{
                        product(id: "${idOfProduct}"){
                            id 
                            name
                            gallery
                            description
                            attributes {
                                id 
                                name 
                                type
                                items{
                                    displayValue
                                    value
                                    id
                                }
                            }
                            brand
                            prices{
                                currency{
                                    label
                                    symbol
                                }
                                amount
                            }
                            
                        }
                       
                        
                    }`,
            }),
        })
        const request = await response.json()
        return request
    }
)


const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        categories: {
            allCategories: [],
            selectedCategory: null,
        },
        currencies: {
            allCurrencies: [],
            selectedCurrency: {
                name: null,
                symbol: null,
            },
            visibilityOfDropDownMenu: false,
        },
        allProducts: [],
        productDescriptionPage: {
            name: null,
            brand: null,
            description: null,
            attributes: [],
            prices: [],
            gallery: [],

        },
        swiperInfo: {
            allImgLength: null,
            firstVisibleItem: 1,
            translateY: 0,
            selectedImg: null,
            translateX: 0,
        },

        productsInCart: [],
        visibilityOfCartOverlay: false,
        totalCartInfo: {
            quantity: null,
            totalPrice: null,
            totalTax: null,
            taxPercent: 10,
        },
        loadingInfo: {
            fetchCategoriesAndCurrences: {
                status: null,
                errorMessage: null,
            },
            fetchProductsOfCategory: {
                status: null,
                errorMessage: null,
            },
            fetchProductsDiscriptionPage: {
                status: null,
                errorMessage: null,
            },
        },

    },
    reducers: {
        changeSelectedCategory: (state, action) => {
            state.categories.selectedCategory = action.payload
        },
        changeSelectedCurrency: (state, action) => {
            state.currencies.selectedCurrency.name = action.payload.name
            state.currencies.selectedCurrency.symbol = action.payload.symbol
        },
        hideDropDownMenu: (state) => {
            state.currencies.visibilityOfDropDownMenu = false
        },
        openingDropDownMenu: (state) => {
            state.currencies.visibilityOfDropDownMenu = true
        },
        hideVisibilityOfCartOverlay: (state) => {
            state.visibilityOfCartOverlay = false
        },
        openingVisibilityOfCartOverlay: (state) => {
            state.visibilityOfCartOverlay = true
        },
        onClickSwiperNextButton: (state) => {
            state.swiperInfo.firstVisibleItem += 1
            state.swiperInfo.translateY -= 120
        },
        onClickSwiperPrevButton: (state) => {
            state.swiperInfo.firstVisibleItem -= 1
            state.swiperInfo.translateY += 120
        },
        swiperInDefolState: (state) => {
            state.swiperInfo.firstVisibleItem = 1
            state.swiperInfo.translateY = 0
        },
        onChangeSelectedImg: (state, action) => {
            state.swiperInfo.selectedImg = action.payload
        },
        onChangeAttributes: (state, action) => {
            state.productDescriptionPage.attributes = action.payload
        },
        changeProductsInCart: (state, action) => {
            state.productsInCart = action.payload
        },
        productInCartIncrement: (state, action) => {
            state.productsInCart[action.payload].amount += 1
        },
        productInCartDecrement: (state, action) => {
            state.productsInCart[action.payload].amount -= 1
        },
        setTotalCartInfo: (state, action) => {
            state.totalCartInfo.quantity = action.payload.quantity
            state.totalCartInfo.totalPrice = action.payload.totalPrice
            state.totalCartInfo.totalTax = action.payload.totalTax
        },



    },
    extraReducers: {

        [fetchCategoriesAndCurrences.pending]: (state) => {
            state.loadingInfo.fetchCategoriesAndCurrences.status = 'pending'
        },
        [fetchCategoriesAndCurrences.fulfilled]: (state, action) => {
            state.categories.allCategories = action.payload.data.categories
            state.categories.selectedCategory = action.payload.data.categories[0].name
            state.currencies.allCurrencies = action.payload.data.currencies
            state.currencies.selectedCurrency.name = action.payload.data.currencies[0].label
            state.currencies.selectedCurrency.symbol = action.payload.data.currencies[0].symbol
            state.loadingInfo.fetchCategoriesAndCurrences.status = null
        },
        [fetchCategoriesAndCurrences.rejected]: (state, action) => {
            state.loadingInfo.fetchCategoriesAndCurrences.status = 'rejected'
            state.loadingInfo.fetchCategoriesAndCurrences.errorMessage = action.error.name
            console.log(action)
        },


        [fetchProductsOfCategory.pending]: (state) => {
            state.loadingInfo.fetchProductsOfCategory.status = 'pending'
        },
        [fetchProductsOfCategory.fulfilled]: (state, action) => {
            state.allProducts = action.payload.data.category.products
            state.loadingInfo.fetchProductsOfCategory.status = null
        },
        [fetchProductsOfCategory.rejected]: (state, action) => {
            state.loadingInfo.fetchProductsOfCategory.status = 'rejected'
            state.loadingInfo.fetchProductsOfCategory.errorMessage = action.error.name
        },

        [fetchProductsDiscriptionPage.pending]: (state) => {
            state.loadingInfo.fetchProductsDiscriptionPage.status = 'pending'
        },
        [fetchProductsDiscriptionPage.fulfilled]: (state, action) => {
            state.productDescriptionPage.name = action.payload.data.product.name
            state.productDescriptionPage.brand = action.payload.data.product.brand
            state.productDescriptionPage.description = action.payload.data.product.description

            state.productDescriptionPage.prices = action.payload.data.product.prices
            state.productDescriptionPage.gallery = action.payload.data.product.gallery
            state.swiperInfo.allImgLength = action.payload.data.product.gallery.length
            state.swiperInfo.selectedImg = action.payload.data.product.gallery[0]
            let array = [];
            for (let i = 0; i < action.payload.data.product.attributes.length; i++) {
                array.push({...action.payload.data.product.attributes[i], errorMessange: null, selectedAttribute: null})
            }

            state.productDescriptionPage.attributes = array
            state.loadingInfo.fetchProductsDiscriptionPage.status = null
        },
        [fetchProductsDiscriptionPage.rejected]: (state , action) => {
            state.loadingInfo.fetchProductsDiscriptionPage.status = 'rejected'
            state.loadingInfo.fetchProductsDiscriptionPage.errorMessage = action.error.name
        },


    }
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const {actions, reducer} = toolkitSlice;

// export individual action creator functions
export const {
    changeSelectedCategory,
    changeSelectedCurrency,
    hideDropDownMenu,
    openingDropDownMenu,
    onClickSwiperNextButton,
    onClickSwiperPrevButton,
    onChangeSelectedImg,
    onChangeAttributes,
    swiperInDefolState,
    changeProductsInCart,
    productInCartIncrement,
    productInCartDecrement,
    hideVisibilityOfCartOverlay,
    openingVisibilityOfCartOverlay,
    setTotalCartInfo
} = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;