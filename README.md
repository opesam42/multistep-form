# Django Multistep Subscription Form

## Introduction
In this project, I developed a dynamic multistep subscription form as part of a subscription management system, a task assigned by FrontendMentors. The form allows users to input and review their subscription preferences across multiple steps, enhancing the overall user experience. By breaking the form into smaller, manageable sections, users can easily navigate through the process without feeling overwhelmed. 

## Technologies Used:
- **Frontend:** HTML, CSS, JavaScript
JavaScript handles form interactions, including dynamically updating prices for add-ons based on user input.
CSS is used to style the multistep form and provide a responsive design that works well across devices.
- **Backend:** Django
Django sessions are used to manage form data across multiple steps and also to send confirmation emails.
A MySQL database is employed for storing the final form submissions.

## Challenges Faced
- **Session Data Handling:** One challenge was ensuring data consistency across steps. I solved this by using session variables effectively, ensuring no data was lost if the user navigated between steps.
- **Real-Time Price Updates:**  Handled with the Django session data and JavaScript.

## Learning Outcomes
- **Session Handling**
- **Editing and cleaning input data before submitting to the database**
- **Editing Django Form template for more control**
- **Manipulating JavaScript to work dynamically with Django form field **
## How to Run the Project Locally

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/opesam42/multistep-form.git
    cd multistep-form
    ```

2. **Create a Virtual Environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows: venv\Scripts\activate
    ```

3. **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Configure Database Settings:**
   Update the DATABASES setting in settings.py with your MySQL database credentials.

5. **Run Migrations:**
    ```bash
    python manage.py migrate
    ```

6. **Start the Development Server:**
    ```bash
    python manage.py runserver
    ```

7. **Access the Application:** Open your web browser and go to [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

## Deployment
- https://subscrform.vercel.app
## Author
- Website - [Gbenga Opeyemi](https://gbenga.koyeb.app)
- Frontend Mentor - [@opesam42](https://www.frontendmentor.io/profile/opesam42)
- Twitter - [@gbengaope04](https://www.twitter.com/@gbengaopeyemi04)
- LinkedIn - [Opeyemi Oluwagbemiga](www.linkedin.com/in/opeyemi-oluwagbemiga-2ba61423b)

