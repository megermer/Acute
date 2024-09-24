from tkinter import *
from tkinter import messagebox

gender = "null"
name = "null"
major = "null"

def userInfo():
    print(f"I am {name}. I'm a {major} major")

def signIn():
    signInBtn.destroy()

    signInWindow = Frame(root)
    signInWindow.grid(row=0, column=0, padx=20, pady=20)  # Use grid() for placement

    var1 = IntVar()
    Checkbutton(signInWindow, text='male', variable=var1).grid(row=0, column=0, sticky=W)
    var2 = IntVar()
    Checkbutton(signInWindow, text='female', variable=var2).grid(row=1, column=0, sticky=W)
    
    # Labels and Inputs
    nLabel = Label(signInWindow, text="Name")
    nLabel.grid(row=2, column=0, sticky=W, padx=5, pady=5)

    nameInput = Entry(signInWindow)
    nameInput.grid(row=2, column=1, padx=5, pady=5)

    mLabel = Label(signInWindow, text="Major")
    mLabel.grid(row=3, column=0, sticky=W, padx=5, pady=5)

    majorInput = Entry(signInWindow)
    majorInput.grid(row=3, column=1, padx=5, pady=5)

    def updateUserInfo():
        global gender
        global name
        global major
        
        if var1.get() == 1:
            gender = "male"
        elif var2.get() == 1:
            gender = "female"
        name = nameInput.get()
        major = majorInput.get()
        
        if (gender == "null" or not nameInput.get().strip() or not majorInput.get().strip()):
            messagebox.showinfo("Alert", "Please complete sign-in process")
        else: 
            print(f"var1: {var1.get()} and var2: {var2.get()}")
            print(f"Updated info: Name = {name}, Gender = {gender}, Major = {major}")
        
            signInWindow.destroy()
            startDeck(0)

    button = Button(signInWindow, text='Done', width=25, command=lambda: [updateUserInfo()])
    button.grid(row=4, column=0, columnspan=2, pady=10)

    # Centering the signInWindow
    root.grid_rowconfigure(0, weight=1)
    root.grid_columnconfigure(0, weight=1)
    
def startDeck(currIndex):
    # Example JSON data (for future use)
    cards = {
        "entries": [
            {"name": "General", "question": "How are you", "answer": "I am good"},
            {"name": "Continue", "question": "That's cool", "answer": "yeah"},
            {"name": "Ending", "question": "Anyway goodbye", "answer": "goodbye"}
        ]
    }

    card = Frame(root, width=300, height=250, bg="lightblue")
    card.grid(row=0, column=0, padx=10, pady=10)

    question = cards["entries"][currIndex]["question"]
    text = Text(card, height=10, width=30, bg="white")
    text.grid(row=0, column=0, padx=10, pady=10)
    text.insert(END, f'QUESTION:\n{question}')
    
    text.tag_configure("center", justify='center')
    text.tag_add("center", "1.0", END)
    
    def showAnswer(): 
        answerFrame = Frame(root, width=300, height=250, bg="lightgreen")
        answerFrame.grid(row=1, column=0, padx=10, pady=10)  # Place below the question frame
    
        answer = cards["entries"][currIndex]["answer"]
        answerText = Text(answerFrame, height=10, width=30, bg="white")
        answerText.grid(row=0, column=0, padx=10, pady=10)
        answerText.insert(END, f'ANSWER:\n{answer}')
        
        answerText.tag_configure("center", justify='center')
        answerText.tag_add("center", "1.0", END)
        
        cardBtn.destroy()  # Destroy the show button after showing the answer
        
        def destroyNext():
            answerFrame.destroy()  # Remove the answer frame when moving to the next card
            startDeck(currIndex + 1)
        
        nextBtn = Button(answerFrame, text='next', command=destroyNext)
        nextBtn.grid(row=1, column=0, padx=10, pady=10, sticky=E)  # Place the next button on the right

    cardBtn = Button(card, text='show', command=showAnswer)
    cardBtn.grid(row=1, column=0, padx=10, pady=10, sticky=W)  # Place the show button on the left
    
root = Tk()

'''
    Window Parameters
'''
root.title('Acute')
root.minsize(height=500, width=500)

'''
    Root Widgets
'''
signInBtn = Button(root, text='Sign in', width=25, command=signIn)
signInBtn.grid(row=0, column=0)  

root.grid_rowconfigure(0, weight=10)
root.grid_columnconfigure(0, weight=10)

  
root.mainloop()
