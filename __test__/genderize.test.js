const request = require('request');

function requestPromise(endpoint){

	const api = 'https://api.genderize.io/';

	return new Promise((res,rej) =>{

		request(api + endpoint,(error,response,body) =>{

			if(error){
				rej(error);
			} else {
				res(body);
			}

		});
	});
}


describe('Testing the Genderize api',() => {

	it('Test single name endpoint',() =>{

		return requestPromise('?name=peter').then((body) =>{

			const json = JSON.parse(body);

			expect(json).toHaveProperty('name', 'peter');

		});

	});

	it('Test multi name length endpoint',() =>{

		const endpoint = '?name[0]=peter&name[1]=lois&name[2]=stevie';

		return requestPromise(endpoint).then((body) =>{

			const json = JSON.parse(body);

			expect(json).toHaveLength(3);

		});

	});

	it('Test probability endpoint',()=>{

		const endpoint = '?name=kim';
		
		return requestPromise(endpoint).then((body) =>{

			const json = JSON.parse(body);

			expect(json).toHaveProperty('probability');

			expect(json.probability).toBeGreaterThan(0.5);

		});	

	});


	it('Test gender endpoint',() =>{

		const endpoint = '?name=richi';

		return requestPromise(endpoint).then((body) =>{

			const json = JSON.parse(body);

			expect(json).toHaveProperty('gender');

			expect(json.gender).toBe('male');
		});
	});

});
