import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: //Convention naming
            return { 
                ...state, // Good practice to not forget to copy everyting from previous state
                ingredients: [
                    ...state.ingredients, // Keep all ingredients
                    action.payload
                ]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...action.payload
                ]
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient, // Example: Avoid overwriting the id (copy everything first)
                ...action.payload
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((_, index) => {
                    return index !== state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.START_EDIT:

            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        default:
            return state;
    } 
}