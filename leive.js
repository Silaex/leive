/**
 * TODO: Pouvoir subscribe a certains states seulement et receuillir ses states dans les parametres de la fonction subscribe
 * 
 * Leive.js
 * Made by Alexis PROVOT
 * GitHub: @Silaex
 * version 0.1.0
 */

function State() {
    const store = {};
    const subscribedFunctions = [];

    /**
     * @description Vérifie si les types demandés sont conformes et renvoie un booleen de confirmation.
     * @param {String[]} values 
     * @param {String[]} types 
     * @returns {boolean}
     */
    function typeVerification(values=[], types=[]) {
        // Ces variables sont pour auquel cas ce ne serait que pour tester un type et non plusieurs
        const valuesArray = !Array.isArray(values) ? [values] : values;
        const typesArray = !Array.isArray(types) ? [types] : types;

        if (valuesArray.length !== typesArray.length) {
            throw Error("The number of values should be the same as the types");
        } else {
            const verification = valuesArray.filter(function(value, index) {
                return typeof value === typesArray[index];
            })

            return verification.length === valuesArray.length;
        }
    }

    /**
     * @description Ajoute un state au Store
     * @param {String} name
     * @param {String} value
     */
    function addState(name, value) {
        if (typeVerification(name, "string")) {
            store[name] = value;
        } else {
            throw TypeError("name must be a string");
        }
    }

    /**
     * @description Retourne la valeur du state du nom donnée
     * @param {String} name 
     */
    function getState(name) {
        if (typeVerification(name, "string")) {
            if (name in store) {
                return store[name];
            } else {
                throw ReferenceError("Unknown state")
            }
        } else {
            throw TypeError("name must be a string");
        }
    }

    /**
     * @description Modification d'un state
     * @param {String} name 
     * @param {*} data 
     */
    function dispatch(name = "", data = null) {
        if (typeVerification(name, "string")) {
            if (name in store) {
                store[name] = data;
                subscribedFunctions.forEach(sf => sf.apply(null, null));
            } else {
                throw ReferenceError("Unknown state")
            }
        } else {
            throw TypeError("name must be a string");
        }
    }

    /**
     * @description Permet d'affecter une fonction pour que lorsqu'un **dispatch** est effectuer celle-ci soit activée
     * @param {Function} callback 
     * @returns {Function} Retourne la fonction **unsubscribe** permettant de retirer l'activation fonction
     */
    function subscribe(callback) {
        if (typeVerification(callback, "function")) {
            subscribedFunctions.push(callback);
            return {
                unsubscribe: () => unsubscribe(callback)
            };
        } else {
            throw TypeError("State.subscribe argument must be an function");
        }
    }

    /**
     * @description Permet de retirer l'activation de la fonction attribué
     * @param {Function} callback 
     */
    function unsubscribe(callback) {
        if (typeVerification(callback, "function")) {
            const cbIndex = subscribedFunctions.indexOf(callback);
            if (cbIndex > 0) {
                subscribedFunctions.splice(cbIndex, 1);
            }
        } else {
            throw TypeError("unsubscribe argument must be an function");
        }
    }

    return {
        addState,
        getState,
        subscribe,
        dispatch
    };
}

export default State();