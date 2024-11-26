import { buttonListContainer, icons, mainContainer } from "./styles"

export default function mainMenu() {
    const render = {
        type: 'Container',
        props: {className: mainContainer},
        children: [
            {
                type: 'Container',
                props: {className: buttonListContainer},
                children: [
                    {type: 'ListIcon', props: {className: icons}},
                    {type: 'MapIcon', props: {className: icons}},
                    {type: 'ChatIcon', props: {className: icons}},
                ],
            },
        ],
    }

    return render
}