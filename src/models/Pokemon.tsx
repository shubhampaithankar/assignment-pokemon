export interface Pokemon {
    "id": number,
    "name": string,
    "types": {
        "slot": number,
        "type": {
            "name": string,
            "url": string
        }
    }[],
    "abilities": {
            "ability": {
                "name": string,
                "url": string
            },
            "is_hidden": boolean,
            "slot": number
    }[],
    "sprites": {
        "other": {
            "official-artwork": {
                "front_default": string
            }
        }
    }
}