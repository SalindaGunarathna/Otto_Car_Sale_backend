
pipeline {
    agent any

    tools {
        nodejs 'Nodejs'
    }

    parameters {
        string(name: 'HOST_MACHINE_IP', defaultValue: '54.211.170.158', description: 'IP address of the host machine')
        string(name: 'SECRET_KEY', defaultValue: '', description: 'Secret Key')
        string(name: 'OWNER_EMAIL', defaultValue: '', description: 'Owner Email')
        string(name: 'PASSWORD', defaultValue: '', description: 'Password')
        string(name: 'SYSTEM_EMAIL', defaultValue: '', description: 'system email')
        string(name: 'MONGODB_URl', defaultValue: '', description: 'MongoDB URL')
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub'
        DOCKERHUB_REPO = 'salindadocker/otto-sale-backend'
        DOCKERHUB_API_URL = "https://hub.docker.com/v2/repositories/${DOCKERHUB_REPO}/"
        HOST_SSH_CREDENTIALS = 'hostmachine-ssh-id'
        HOST_MACHINE_IP = '54.211.170.158'
        HOST_MACHINE_USER = 'client'
        MONGO_URI_CREDENTIALS_ID = 'mongo-sale-url'
        SECRET_KEY_CREDENTIAL_ID = 'secret-key-id'
        OWNER_EMAIL_CREDENTIAL_ID = 'owner-email-id'
        PASSWORD_CREDENTIAL_ID = 'password-id'
        SYSTEM_EMAIL_ID = "system-email-id"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // stage('Run Unit Tests') {
        //     steps {
        //         sh 'npm install'
        //         sh 'npm test'
        //     }
        // }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKERHUB_REPO}:${env.BUILD_ID}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push("${env.BUILD_ID}")
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Set Image to Public') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_TOKEN')]) {
                        sh """
                        curl -u $DOCKERHUB_USERNAME:$DOCKERHUB_TOKEN \
                             -X PATCH \
                             -H "Content-Type: application/json" \
                             -d '{"is_private":false}' \
                             $DOCKERHUB_API_URL
                        """
                    }
                }
            }
        }

        stage('Deploy to Host Machine') {
            steps {
                script {
                    withCredentials([
                        sshUserPrivateKey(credentialsId: HOST_SSH_CREDENTIALS, keyFileVariable: 'SSH_KEY'),
                        string(credentialsId: MONGO_URI_CREDENTIALS_ID, variable: 'MONGO_URL'),
                        string(credentialsId: SECRET_KEY_CREDENTIAL_ID, variable: 'SECRET_KEY_DEFAULT'),
                        string(credentialsId: OWNER_EMAIL_CREDENTIAL_ID, variable: 'OWNER_EMAIL_DEFAULT'),
                        string(credentialsId: PASSWORD_CREDENTIAL_ID, variable: 'PASSWORD_DEFAULT'),
                        string(credentialsId: SYSTEM_EMAIL_ID, variable: 'SYSTEM_EMAIL_DEFAULT')
                    ]) {
                        def SECRET_KEY = params.SECRET_KEY ?: env.SECRET_KEY_DEFAULT
                        def OWNER_EMAIL = params.OWNER_EMAIL ?: env.OWNER_EMAIL_DEFAULT
                        def PASSWORD = params.PASSWORD ?: env.PASSWORD_DEFAULT
                        def SYSTEM_EMAIL = params.SYSTEM_EMAIL ?: env.SYSTEM_EMAIL_DEFAULT
                        def MONGODB_URL = params.MONGO_URL ?: env.MONGO_URL

                        sh """
                        ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no ${HOST_MACHINE_USER}@${HOST_MACHINE_IP} '
                            docker pull ${DOCKERHUB_REPO}:latest
                            docker stop otto-sale-backend || true
                            docker rm otto-sale-backend || true
                            docker run -d -p 3001:3001 --name otto-sale-backend \
                                -e MONGO_URL="$MONGODB_URL" \
                                -e PORT="3001" \
                                -e SECRET_KEY="${SECRET_KEY}" \
                                -e OWNER_EMAIL="${OWNER_EMAIL}" \
                                -e PASSWORD="${PASSWORD}" \
                                -e EMAIL="${SYSTEM_EMAIL}" \
                                ${DOCKERHUB_REPO}:latest
                        '
                        """
                    }
                }
            }
        }
    }
}