pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Areeb473/TIC-TAC-TOE-.git'
            }
        }
        stage('Deploy Locally') {
            steps {
                script {
                    // Define the deployment path
                    def deployPath = 'C:\\Users\\Saad Hassan\\Desktop\\arsalan\\devops_project'
                    
                    // Ensure deployment directory exists
                    bat "if not exist \"${deployPath}\" mkdir \"${deployPath}\""
                    
                    // Copy files to deployment directory
                    bat "xcopy /E /I /Y . \"${deployPath}\""
                }
            }
        }
        stage('Post Deployment Check') {
            steps {
                echo 'Deployment Complete!'
                echo 'You can access the project at: C:\\Users\\Saad Hassan\\Desktop\\arsalan\\devops_project'
            }
        }
    }
}
