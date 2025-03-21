pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install the dependencies using npm
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                // Build the project (if there are any build steps)
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // Run the tests
                sh 'npm test'
            }
        }
        stage('Archive') {
            steps {
                // Archive the build artifacts
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }
    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
    }
}
