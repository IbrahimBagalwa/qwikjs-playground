import { Resource, component$, useResource$, useSignal } from '@builder.io/qwik'

import { CONTACTS, Contact } from './fake-contact-db'
import styles from './contact.module.css'
export default component$(() => {
  const contactsResponse = useResource$<Contact[]>(() => {
    return CONTACTS.map((contact) => {
      return {
        id: contact.id,
        name: contact.name,
        avatar: contact.avatar,
      }
    })
  })
  const filteredContacts = useSignal('')
  return (
    <div class={styles.centerContainer}>
      <h1>Contact</h1>
      <input
        class={styles.search}
        type='text'
        placeholder='search'
        onInput$={(event) =>
          (filteredContacts.value = (event.target as HTMLInputElement).value)
        }
      />
      <Resource
        value={contactsResponse}
        onPending={() => <div>Loading...</div>}
        onResolved={(contacts) => {
          const filterContact = contacts.filter(
            (c) =>
              c.name
                .toLowerCase()
                .indexOf(filteredContacts.value.toLowerCase()) > -1
          )
          const mappedContact =
            filterContact.length > 0 ? filterContact : contacts
          return (
            <section class={styles.container}>
              {mappedContact.map((contact) => (
                <a
                  href={'/contact/' + contact.id + '/'}
                  key={contact.id}
                  class={styles.content}
                >
                  <img
                    width='200'
                    height='200'
                    src={contact.avatar}
                    alt={contact.name}
                    class={styles.avatar}
                  />
                  <div>
                    <p class={styles.name}>{contact.name}</p>
                  </div>
                </a>
              ))}
            </section>
          )
        }}
      />
    </div>
  )
})
