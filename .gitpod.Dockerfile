FROM gitpod/workspace-full

USER root

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
# RUN sudo apt-get -q update && \
#     sudo apt-get install -yq bastet && \
#     sudo rm -rf /var/lib/apt/lists/*
#
# More information: https://www.gitpod.io/docs/42_config_docker/
RUN apt -y update && \
    apt -y install chromium-browser && \
    apt -y install chromium-chromedriver && \
    apt -y install fonts-ipafont-gothic fonts-ipafont-mincho && \
    apt -y install p7zip-full
