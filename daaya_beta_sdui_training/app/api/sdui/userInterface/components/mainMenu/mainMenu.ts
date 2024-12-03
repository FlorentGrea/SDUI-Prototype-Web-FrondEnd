import { buttonListContainer, icons, mainContainer } from "./styles"
import { getIcon } from "../icons/getIcon"

export default function mainMenu() {
    const render = {
        type: 'Container',
        props: {className: mainContainer},
        children: [
            {
                type: 'Container',
                props: {className: buttonListContainer},
                children: [
                    getIcon('listIcon', {className: icons}),
                    getIcon('mapIcon', {className: icons}),
                    getIcon('chatIcon', {className: icons}),
                ],
            },
        ],
    }

    return render
}