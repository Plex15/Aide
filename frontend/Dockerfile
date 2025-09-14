FROM node:lts-trixie-slim

WORKDIR /app

RUN apt update -y && apt upgrade -y

ENV ANDROID_HOME=/opt/android/sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

# Install Java, download tools, and the Android SDK in a single layer
RUN apt-get -y update && \
    apt-get install -y --no-install-recommends \
    openjdk-21-jdk \
    curl \
    wget \
    unzip \
    && \
    # Download and set up the Android command-line tools
    mkdir -p ${ANDROID_HOME} && \
    wget -O cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip && \
    unzip cmdline-tools.zip -d ${ANDROID_HOME}/cmdline-tools && \
    mv ${ANDROID_HOME}/cmdline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest && \
    rm cmdline-tools.zip && \
    # Use sdkmanager to install platform-tools (for adb) and accept licenses
    yes | sdkmanager --licenses > /dev/null && \
    sdkmanager "platform-tools" && \
    # Clean up apt cache to keep the image smaller
    rm -rf /var/lib/apt/lists/* && \
    cd /app && \
    wget -O java-17.deb https://download.oracle.com/java/17/archive/jdk-17.0.12_linux-x64_bin.deb && \
    apt install ./java-17.deb && \
    rm ./java-17.deb

#EXPOSE 5037

COPY package*.json ./

RUN npm install  

COPY . .

#CMD ["npx", "react-native", "start", "--host", "0.0.0.0"]
 