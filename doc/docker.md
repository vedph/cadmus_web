# Docker

This section contains practical instructions for using the Cadmus Docker images.

## Quick Start

Quick start instructions are for those who are familiar with Docker. Otherwise, you can refer to the sections following this one.

Assuming that you already have **Docker** installed, to use Cadmus you can follow these steps (which are equally valid for both Linux and Windows; of course, for Windows you should omit the `sudo` prefix where found):

1. save the `docker-compose.yml` file somewhere in your machine.

2. login into Docker using your Docker account: `sudo docker login --username <DOCKERUSERNAME>`. You will be prompted for the password.

3. from a command prompt, enter the directory where you saved the `docker-compose.yml` file, and type the command `sudo docker-compose up`. This will fire a MongoDB service, create and seed databases with mock data, start the API layer, and start the frontend.

4. if everything went OK, open your browser at `localhost:4200`. To login:
   - username: `zeus`
   - password: `P4ss-W0rd!`

These credentials are found in the `appsettings.json` configuration file of the [API project](https://github.com/vedph/cadmus_api). Please notice that in production they are always replaced with true credentials, set in server environment variables.

When you want to stop the service, break from it in the console and to clean up enter `sudo docker-compose down`.

## Consuming a Docker Image

### Windows - Setup Docker

- download and install from <https://hub.docker.com/editions/community/docker-ce-desktop-windows> (see <https://docs.docker.com/docker-for-windows/install/>).

Once installed, ensure you have switched Docker to Linux containers.

### Ubuntu - Setup Docker

In the consumer __Linux machine__, you must have installed *Docker* and *Docker compose*. To install (see <https://docs.docker.com/install/linux/docker-ce/ubuntu/>):

```bash
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io
```

You can verify that Docker is installed correctly by running the hello-world image:

```bash
sudo docker run hello-world
```

To automatically start Docker:

```bash
sudo systemctl start docker
```

and then:

```bash
sudo systemctl enable docker
```

Check for installation: `docker --version`.

### Ubuntu - Setup Docker-Compose

Install Docker compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo curl -L https://raw.githubusercontent.com/docker/compose/1.25.0/contrib/completion/bash/docker-compose -o /etc/bash_completion.d/docker-compose
```

(replace `1.25.0` with the latest docker compose release). Test with `docker-compose --version`.

### Ubuntu - Other Software

Useful apps links for Ubuntu:

- [TeamViewer](https://www.teamviewer.com/en/download/linux/)
- [Chrome](https://www.google.com/intl/en-US/chrome/)
- [MongoDB Compass](https://www.mongodb.com/download-center?jmp=nav#compass)
- [VSCode](https://code.visualstudio.com/download)
- [NodeJS](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04):

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs
```

Check node version: `node --version`, `npm --version`.

- [Angular CLI](https://tecadmin.net/install-angular-on-ubuntu/): uninstall and reinstall, or just install if no previous version:

```bash
sudo npm uninstall -g @angular/cli
sudo npm cache verify
sudo npm install -g @angular/cli@latest
```
