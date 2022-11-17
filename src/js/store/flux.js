const getState = ({ getStore, getActions, setStore }) => {
	return {
		
		store: {
			personajeSW: [],
			planetasSW:[],
			favorites: [],
			demo: [
				

				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			

			getPersonajes: ()=>{
				fetch("https://www.swapi.tech/api/people/", {
					method: "GET",
					headers:{"Content-Type":"application/json"}
				})
 				 .then(response => response.json())
 				 .then(data => setStore({personajeSW:data.results}))
 				 .catch(error => console.log('error', error));
			},

			getPlanetas:()=>{
				fetch("https://www.swapi.tech/api/planets/", {
					method: "GET",
					headers:{"Content-Type":"application/json"}
				})
  				.then(response => response.json())
  				.then(data => setStore({planetasSW:data.results}))
  				.catch(error => console.log('error', error));
			},

			addFavorites: (item) => {

                const store = getStore();
                if (!store.favorites.includes(item)) {
                    setStore({
                        favorites: [...store.favorites, item]
                    });
                } else {
                    setStore({
                        favorites: store.favorites.filter((name) =>
                            name !== item)
                    })
                }

            },

            deleteFavorites: (index) => {

                const store = getStore();

                setStore({
                    favorites: store.favorites.filter((favorites, i) => i !== index)
                })


            },



			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
