# Threat Modeling Tool Single Page App (SPA)
Built on top of the Threat Composer Tool by Amazon (https://awslabs.github.io/threat-composer/workspaces/default/dashboard)
This version consolidates the 2 original projects (threat-composer & threat-composer-app)  into a single project and removes the 3rd project entirely (threat-composer-infra) as we will be using a different deployment topology.
It also adds a new dependency @projectstorm/react-diagrams, for further development of a DFD builder.

## Features included in this MVP (yet to be developed)
- Interactive Dataflow Diagram builder: facilitates STRIDE-per-element threat modeling
- Questionnaire-based selection of security controls

## Quickstart using the devcontainer
1. Clone the repo ``git clone https://github.com/cds-snc/threat-modeling-tool.git``
2. Using [VS Code](https://code.visualstudio.com/) and the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), select ``Dev Containers: Open Folder in Container...`` and select the project folder.
3. The devcontainer will install and build the initial app, so all you need to do get it running is run `npm start` in the terminal.