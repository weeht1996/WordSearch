export function WordsInputForm() {



    return (
        <form >
            <div className="form-row">
                <div className="col-5">
                    <textarea name="" id="" cols="60" rows="10"></textarea>
                </div>
                <div className="col-5">
                    <label htmlFor="">
                        <input type="checkbox" name="intersection" id="intersection" /> Enable Intersection
                    </label>
                </div>
            </div>
        </form>
    )
}