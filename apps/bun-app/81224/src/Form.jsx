export const Form = () => {
    return (
        <section>
            <div className="container">
                <form>
                    <div className="input_wrap">
                        <input type="text" name="name" />
                    </div>
                    <div className="input_wrap">
                        <input type="email" name="email" />
                    </div>
                    <div className="input_wrap">
                        <textarea name="message"></textarea>
                    </div>
                </form>
            </div>
        </section>
    )
}