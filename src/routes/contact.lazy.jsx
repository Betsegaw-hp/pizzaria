import { useMutation } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import postContact from '../api/postContact';

export const Route = createLazyFileRoute('/contact')({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return postContact(
        formData.get('name'),
        formData.get('email'),
        formData.get('message')
      );
    },
    mutationKey: 'contact', // optional key to use for the mutation cache key (defaults to the mutationFn) 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate(formData);
  };

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isError && 
        <h3 className="error-text">Something went wrong!</h3>
      }

      {mutation.isLoading &&
        <h4>Submitting...</h4>
      }
      {mutation.isSuccess ?  (
        <h3 role="heading" aria-level="3">Submitted!</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <textarea placeholder="Message" name="message"></textarea>
          <button role="button">Submit</button>
        </form>
      )}
    </div>
  );
}
